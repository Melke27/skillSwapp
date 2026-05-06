import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { theme } from "../theme";

export const AuthScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    try {
      setBusy(true);
      if (mode === "login") {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password, school.trim());
      }
    } catch (error) {
      Alert.alert("Authentication failed", "Please check your details and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>SkillSwap</Text>
        <Text style={styles.subtitle}>Exchange skills. Learn together. Grow together.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Pressable style={[styles.switchBtn, mode === "register" && styles.switchActive]} onPress={() => setMode("register")}>
            <Text style={[styles.switchText, mode === "register" && styles.switchTextActive]}>Sign Up</Text>
          </Pressable>
          <Pressable style={[styles.switchBtn, mode === "login" && styles.switchActive]} onPress={() => setMode("login")}>
            <Text style={[styles.switchText, mode === "login" && styles.switchTextActive]}>Login</Text>
          </Pressable>
        </View>

        {mode === "register" && (
          <>
            <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="School / University" value={school} onChangeText={setSchool} />
          </>
        )}

        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <Pressable style={styles.action} onPress={submit} disabled={busy}>
          <Text style={styles.actionText}>{busy ? "Please wait..." : mode === "register" ? "Create Account" : "Login"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center"
  },
  hero: {
    marginBottom: 20
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: theme.colors.text
  },
  subtitle: {
    marginTop: 8,
    color: theme.colors.muted,
    fontSize: 16
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  switchRow: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#EAF0F5",
    borderRadius: 10
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center"
  },
  switchActive: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10
  },
  switchText: {
    color: theme.colors.muted,
    fontWeight: "600"
  },
  switchTextActive: {
    color: "#fff"
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  action: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4
  },
  actionText: {
    color: "#fff",
    fontWeight: "700"
  }
});
