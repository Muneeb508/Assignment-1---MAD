import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
  Alert, 
  RefreshControl, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text 
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const headerBackgroundColor = useThemeColor({}, 'backgroundElevated');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing will be available in a future update!');
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor }]}> 
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Share</Text>
            {user.skillsOffered.length > 0 ? (
              <View style={styles.skillsContainer}>
                {user.skillsOffered.map((skill, index) => (
                  <View key={index} style={styles.skillTag}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>No skills offered yet</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills I Want to Learn</Text>
            {user.skillsWanted.length > 0 ? (
              <View style={styles.skillsContainer}>
                {user.skillsWanted.map((skill, index) => (
                  <View key={index} style={[styles.skillTag, styles.wantedSkillTag]}>
                    <Text style={[styles.skillText, styles.wantedSkillText]}>
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>No skills wanted yet</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.skillsOffered.length}</Text>
                <Text style={styles.statLabel}>Skills Shared</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.skillsWanted.length}</Text>
                <Text style={styles.statLabel}>Skills to Learn</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  avatarText: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.light.textInverse,
  },
  name: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  email: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  editButtonText: {
    fontSize: Typography.sm,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  bio: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillTag: {
    backgroundColor: Colors.light.primary + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  wantedSkillTag: {
    backgroundColor: Colors.light.warning + '20',
  },
  skillText: {
    fontSize: Typography.sm,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  wantedSkillText: {
    color: Colors.light.warning,
  },
  emptyText: {
    fontSize: Typography.base,
    color: Colors.light.textTertiary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sm,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: Colors.light.error,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...Shadows.sm,
  },
  logoutButtonText: {
    fontSize: Typography.lg,
    fontWeight: '600',
    color: Colors.light.textInverse,
  },
  loadingText: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});