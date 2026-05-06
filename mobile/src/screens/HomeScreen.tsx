import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { api } from "../api/client";
import { withAuth } from "../api/client";
import { SkillTag } from "../components/SkillTag";
import { UserProfile } from "../types/models";
import { theme } from "../theme";

type HomeScreenProps = {
  token: string;
  profile: UserProfile | null;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ token, profile }) => {
  const [popularTeach, setPopularTeach] = useState<string[]>([]);
  const [popularLearn, setPopularLearn] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/skills", withAuth(token));
      const topTeach = (res.data.topTeachSkills as Array<{ skill: string; count: number }>).slice(0, 6);
      const topLearn = (res.data.topLearnSkills as Array<{ skill: string; count: number }>).slice(0, 6);
      setPopularTeach(topTeach.map((s) => s.skill));
      setPopularLearn(topLearn.map((s) => s.skill));
    })().catch(() => undefined);
  }, [token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.greeting}>Welcome{profile ? `, ${profile.name}` : ""}</Text>
        <Text style={styles.bannerText}>Trade knowledge, not money. Build your skill network in campus.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Teach Skills</Text>
        <View style={styles.rowWrap}>
          {profile?.skillsToTeach?.length ? profile.skillsToTeach.map((s) => <SkillTag key={s} label={s} />) : <Text style={styles.empty}>Add skills in Profile tab.</Text>}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Popular Skills Students Teach</Text>
        <View style={styles.rowWrap}>
          {popularTeach.length ? popularTeach.map((s) => <SkillTag key={s} label={s} tone="secondary" />) : <Text style={styles.empty}>No data yet.</Text>}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Popular Skills Students Want to Learn</Text>
        <View style={styles.rowWrap}>
          {popularLearn.length ? popularLearn.map((s) => <SkillTag key={s} label={s} />) : <Text style={styles.empty}>No data yet.</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: 12
  },
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: 16
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800"
  },
  bannerText: {
    color: "#e5f8ff",
    marginTop: 8,
    fontSize: 15
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 14,
    borderColor: theme.colors.border,
    borderWidth: 1
  },
  sectionTitle: {
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 10
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  empty: {
    color: theme.colors.muted
  }
});
