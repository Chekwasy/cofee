import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function VerificationCodeScreen() {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const RESEND_TIME = 30;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (secondsLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    if (!canResend) return;

    // 🔹 Call your resend API here
    console.log("Resend OTP");

    // Reset timer
    setSecondsLeft(RESEND_TIME);
    setCanResend(false);
  };

  useEffect(() => {
    const submitIfComplete = async () => {
      if (isSubmitting) return;

      if (code.every((digit) => digit !== "")) {
        setIsSubmitting(true);

        const otp = code.join("");
        const isValid = await verifyCode(otp);

        if (isValid) {
          router.replace("/auth/fpwd/changepwd");
        } else {
          setIsSubmitting(false);
        }
      }
    };

    submitIfComplete();
  }, [code]);

  const handleChange = (text: string, index: number) => {
    const cleanedText = text.replace(/\D/g, "");

    // 🔹 Handle delete
    if (cleanedText === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    // 🔹 Handle paste (4 digits)
    if (cleanedText.length === 4) {
      const splitCode = cleanedText.split("").slice(0, 4);
      setCode(splitCode);
      inputs.current[3]?.focus();
      return;
    }

    // 🔹 Single digit entry
    if (cleanedText.length === 1) {
      const newCode = [...code];
      newCode[index] = cleanedText;
      setCode(newCode);

      if (index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && code[index] === "" && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (otp: string) => {
    // 🔹 Replace with real API call
    return otp.length === 4;
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-3 mb-6 w-8 h-8 items-center justify-center rounded-full"
      >
        <ArrowLeft size={22} color="#000" />
      </TouchableOpacity>

      {/* Header */}
      <Text className="text-2xl font-semibold mb-2 text-black">
        Verification code
      </Text>
      <Text className="text-gray-500 mb-10 leading-6">
        Please enter the verification code we sent to your email address
      </Text>

      {/* Code Inputs */}
      <View className="flex-row justify-center mb-8">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => {
              inputs.current[index] = input;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            keyboardType="number-pad"
            maxLength={4} // important for paste
            className="w-14 h-14 border border-gray-300 mx-3 rounded-full text-center text-lg text-black"
          />
        ))}
      </View>

      {/* Resend */}
      <TouchableOpacity
        onPress={handleResend}
        disabled={!canResend}
        className="mt-2"
      >
        <Text
          className={`text-center ${
            canResend ? "text-black" : "text-gray-400"
          }`}
        >
          {canResend
            ? "Resend code"
            : `Resend in 00:${secondsLeft.toString().padStart(2, "0")}`}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
