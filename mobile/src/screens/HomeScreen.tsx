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
        <View style={styles.bannerGlowA} />
        <View style={styles.bannerGlowB} />
        <Text style={styles.greeting}>Welcome{profile ? `, ${profile.name}` : ""}</Text>
        <Text style={styles.bannerText}>Trade knowledge, not money. Build your skill network on campus.</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile?.skillsToTeach?.length ?? 0}</Text>
            <Text style={styles.statLabel}>Teach Skills</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile?.skillsToLearn?.length ?? 0}</Text>
            <Text style={styles.statLabel}>Learn Goals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile?.rating ? profile.rating.toFixed(1) : "0.0"}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickRow}>
        <View style={styles.quickCard}>
          <Text style={styles.quickTitle}>Profile</Text>
          <Text style={styles.quickText}>Keep your skills updated for better matches.</Text>
        </View>
        <View style={styles.quickCard}>
          <Text style={styles.quickTitle}>Matches</Text>
          <Text style={styles.quickText}>Start chats with people matching your goals.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Teach Skills</Text>
        <View style={styles.rowWrap}>
          {profile?.skillsToTeach?.length ? profile.skillsToTeach.map((s) => <SkillTag key={s} label={s} />) : <Text style={styles.empty}>Add skills in Profile tab.</Text>}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Learning Goals</Text>
        <View style={styles.rowWrap}>
          {profile?.skillsToLearn?.length ? profile.skillsToLearn.map((s) => <SkillTag key={s} label={s} tone="secondary" />) : <Text style={styles.empty}>Add learning goals in Profile tab.</Text>}
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
    gap: 12,
    paddingBottom: 28
  },
  banner: {
    backgroundColor: "#0E7EA8",
    borderRadius: theme.radius.lg,
    padding: 16,
    overflow: "hidden"
  },
  bannerGlowA: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.16)",
    top: -42,
    right: -70
  },
  bannerGlowB: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.12)",
    bottom: -30,
    left: -16
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900"
  },
  bannerText: {
    color: "#E9F8FD",
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21
  },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center"
  },
  statLabel: {
    color: "#DFF5FC",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
    fontWeight: "700"
  },
  quickRow: {
    flexDirection: "row",
    gap: 10
  },
  quickCard: {
    flex: 1,
    backgroundColor: "#0D2A44",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  quickTitle: {
    color: "#DFF3FF",
    fontWeight: "800",
    fontSize: 14
  },
  quickText: {
    color: "#BFD5EA",
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 14,
    borderColor: theme.colors.border,
    borderWidth: 1,
    shadowColor: "#0D273A",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 1
  },
  sectionTitle: {
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 10,
    fontSize: 15
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  empty: {
    color: theme.colors.muted,
    lineHeight: 20
  }
});
