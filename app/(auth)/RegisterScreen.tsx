import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { normalize } from "../theme/normalize";
import { colors } from "../theme/theme";
import { CustomInput } from "../components/ui/Buttons/InputButton";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { GoogleIcon } from "../src/icons/social/GoogleIcon";
import FacebookIcon from "../src/icons/social/FacebookIcon";
import AppleIcon from "../src/icons/social/AppleIcon";
import { PhoneNumberInput } from "../components/ui/PhoneNumberInput/PhoneNumberInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registerUser } from "../api/authService";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useTranslation } from "react-i18next";

// THIS SCREEN IS RESPONSIBLE FOR USER REGISTRATION. USERS NEED TO PICK A DATE TO CONFIRM THEY ARE 18 OR OLDER. USERS THEN
// ENTER THEIR PHONE NUMBER AND PASSWORD

type FormData = {
  phoneNumber: string;
  password: string;
  dob?: Date;
  username: string;
};

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { phoneNumber: "", password: "" },
  });
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [showRegistrationForms, setShowRegistrationForms] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
    const { register } = useAuth(); // import this hook
  const checkEligibility = (selectedDate: Date) => {
    const today = new Date();

    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const eligible = selectedDate <= eighteenYearsAgo;
    setIsEligible(eligible);

    if (!eligible) {
      setBirthDateError("Yaşınız 18-dən kiçikdir. Qeydiyyat mümkün deyil.");
      setShowRegistrationForms(false);
    } else {
      setBirthDateError(null);
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "set" || event.type === "dismissed") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setBirthDate(selectedDate);
      checkEligibility(selectedDate);
    }
  };

  const handleContinueRegistration = () => {
    if (isEligible) {
      setShowRegistrationForms(true);
      setShowDatePicker(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!birthDate) {
      setBirthDateError("Doğum tarixinizi seçməlisiniz.");
      return;
    }
    if (!isEligible) {
      setBirthDateError("Yaşınız 18-dən kiçikdir. Qeydiyyat mümkün deyil.");
      return;
    }
    const dobString = birthDate.toISOString().split("T")[0];
    const registrationPayload = {
      phoneNumber: data.phoneNumber,
      password: data.password,
      dob: dobString,
      username: data.username,
    };
    try {
      const response = await registerUser(registrationPayload);
      register(data.phoneNumber, data.username);
      await AsyncStorage.setItem("tempPhoneNumber", data.phoneNumber);
      router.push({ pathname: "/(auth)/VerifyOtpScreen" });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response?.data?.error;

      if (message.includes("Phone number")) {
        setPhoneError(t("phoneNumberAlreadyTaken"));
        setUsernameError(null);
      } else if (message.includes("Username")) {
        setUsernameError(t("userNameTaken"));
        setPhoneError(null);
      } else {
        setPhoneError(null);
        setUsernameError(t(message));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo/pive.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.greeting}>Xoş gəldin!</Text>

          {/* Date Picker Section */}
          {!showRegistrationForms && (
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.dateInputField,
                birthDateError ? styles.inputError : null,
              ]}
            >
              <Text
                style={
                  birthDateError
                    ? styles.errorBirthDateText
                    : styles.birthDateText
                }
              >
                {birthDate
                  ? birthDate.toLocaleDateString()
                  : "Doğum tarixinizi seçin"}
              </Text>
            </TouchableOpacity>
          )}

          {birthDateError && (
            <Text style={styles.errorText}>{birthDateError}</Text>
          )}

          {showDatePicker && (
            <View style={styles.datePickerWrapper}>
              <DateTimePicker
                testID="dateTimePicker"
                value={birthDate || new Date()}
                mode="date"
                display={"spinner"}
                maximumDate={new Date()}
                onChange={onChangeDate}
              />
            </View>
          )}

          {/* Conditional rendering of 'Continue' button after eligibility */}
          {!showRegistrationForms && (
            <>
              <CustomCTAButton
                onPress={handleContinueRegistration}
                style={styles.continueButton}
                variant="primary"
                label="Davam et!"
                disabled={!isEligible}
              />
            </>
          )}

          {/* Conditional rendering of form fields */}
          {showRegistrationForms && (
            <>
              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="phoneNumber"
                  rules={{
                    required: "Nömrə boş buraxıla bilməz",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobil nömrə təyin edək",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <PhoneNumberInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Nömrəni yazmaq üçün"
                        error={!!error || !!phoneError}
                        errorText={error?.message || phoneError}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: "Ad boş buraxıla bilməz",
                    minLength: {
                      value: 3,
                      message: "Ad ən az 3 simvol olmalıdır",
                    },
                    maxLength: {
                      value: 12,
                      message: "Ad ən çox 12 simvol olmalıdır",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <View>
                      <CustomInput
                        label="İstifadəçi adın"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Səni necə adlandıraq?"
                        variant={error || usernameError ? "error" : "default"}
                        errorText={error?.message || usernameError}
                      />
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Şifrə boş buraxıla bilməz",
                    minLength: {
                      value: 6,
                      message: "Şifrə ən az 6 simvol olmalıdır",
                    },
                    maxLength: {
                      value: 12,
                      message: "Şifrə ən çox 12 simvol olmalıdır",
                    },
                    pattern: {
                      value: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
                      message: "Ən azı bir xüsusi simvol olmalıdır",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <View>
                      <CustomInput
                        label="Yeni şifrə"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Şifrə təyin edək"
                        isSecure={true}
                        variant={error ? "error" : "default"}
                        errorText={error?.message}
                      />
                    </View>
                  )}
                />
              </View>

              <CustomCTAButton
                onPress={handleSubmit(onSubmit)}
                style={[
                  styles.inputField,
                  {
                    borderRadius: normalize("height", 12),
                  },
                ]}
                variant="primary"
                label="BAŞLAYAQ!"
              />
            </>
          )}

          <Text style={styles.haveAccount}>Hesabın var? Giriş et</Text>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>və ya</Text>
            <View style={styles.separatorLine} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FacebookIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AppleIcon />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalize("width", 20),
    paddingTop: normalize("height", 40),
    paddingBottom: normalize("height", 20),
  },
  logoContainer: {
    height: normalize("height", 160),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize("height", 32),
  },
  logo: {
    width: normalize("width", 120),
    height: normalize("height", 120),
  },
  greeting: {
    color: "black",
    fontSize: normalize("font", 32),
    fontWeight: "bold",
    marginBottom: normalize("height", 6),
  },
  secondaryTitle: {
    fontSize: normalize("font", 16),
    color: colors.grey400,
    textAlign: "center",
    marginBottom: normalize("height", 24),
  },
  inputContainer: {
    width: "100%",
    gap: normalize("height", 4),
    marginBottom: normalize("height", 24),
  },
  inputField: {
    width: "100%",
    borderRadius: normalize("width", 4),
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  errorText: {
    color: colors.error,
    fontSize: normalize("font", 12),
    alignSelf: "flex-start",
    paddingLeft: normalize("width", 2),
  },
  submitButton: {
    width: "100%",
    backgroundColor: colors.orange500,
    paddingVertical: normalize("height", 16),
    borderRadius: normalize("width", 4),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize("height", 10),
  },
  submitButtonText: {
    color: colors.white,
    fontSize: normalize("font", 16),
    fontWeight: "bold",
  },
  eyeIconContainer: {
    padding: normalize("width", 4),
  },
  haveAccount: {
    color: colors.grey400,
    fontSize: normalize("font", 14),
    fontWeight: "400",
    marginTop: normalize("height", 24),
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: normalize("height", 20),
    width: "80%",
  },
  separatorLine: {
    flex: 1,
    height: normalize("height", 1),
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: normalize("width", 10),
    color: "#757575",
    fontSize: normalize("font", 16),
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: normalize("width", 50),
    width: normalize("width", 50),
    height: normalize("height", 50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize("width", 10),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: normalize("height", 2) },
    shadowOpacity: 0.2,
    shadowRadius: normalize("width", 2),
  },
  datePickerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    marginTop: normalize("height", 16),
    width: "100%",
    borderRadius: normalize("height", 12),
  },
  pickDate: {
    fontSize: normalize("font", 16),
    fontWeight: "400",
  },

  dateInputField: {
    width: "100%",
    borderRadius: normalize("width", 4),
    maxHeight: normalize("height", 68),
    minHeight: normalize("height", 65),

    paddingVertical: normalize("height", 12),
    paddingHorizontal: normalize("width", 16),
    borderWidth: 1.5,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderColor: colors.orange500,
  },

  birthDateText: {
    fontWeight: 500,
    fontSize: normalize("font", 18),
    color: colors.orange500,
  },
  errorBirthDateText: {
    color: colors.error,
    fontWeight: 500,
    fontSize: normalize("font", 18),
  },
});
