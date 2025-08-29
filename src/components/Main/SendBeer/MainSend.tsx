import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { CustomCTAButton } from "../../ui/Buttons/CTAButton";
import { normalize } from "@/src/theme/normalize";
import ChampagneRound from "@/src/icons/beer/ChampagneRound";
import { colors } from "@/src/theme/theme";
import Champagne from "@/src/icons/beer/Champagne";
import { t } from "i18next";

export default function MainSend() {
  const handleSendPress = () => {
    console.log("Send button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <ChampagneRound />

          <Text style={styles.cardTitle}>{t("sendGift")}</Text>

          <Text style={styles.cardSubtitle}>{t("someoneSpecial")}</Text>

          <View style={styles.buttonContainer}>
            <CustomCTAButton
              label={t("send")}
              variant="primary"
              size="large"
              leftIcon={<Champagne color={colors.orangeText} />}
              onPress={handleSendPress}
              style={styles.sendButton}
              centerContent={true}
              labelStyle={{
                color: colors.orangeText,
                fontSize: normalize("font", 16),
                fontWeight: 600,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: normalize("horizontal", 16),
    marginTop: normalize("vertical", 16),
  },

  greeting: {
    fontSize: normalize('font',18),
    fontWeight: "400",
    color: "#333333",
  },
  name: {
    color: colors.orangeText,
    fontWeight: "600",
  },
  content: {},
  card: {
    backgroundColor: colors.orangeText,
    borderRadius: 16,
    paddingVertical: normalize("vertical", 24),
    paddingHorizontal: normalize("horizontal", 16),
    alignItems: "center",
    minHeight: normalize("height", 252),
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: normalize("font", 28),
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 16,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: normalize("font", 18),
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 22,

    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#ffffff",
    width: "100%",
  },
  placeholderIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIconText: {
    fontSize: 18,
  },
  lightbulbIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  lightbulbIconText: {
    fontSize: 28,
  },
  sendIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIconText: {
    fontSize: 16,
  },
});
