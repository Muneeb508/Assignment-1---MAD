import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import { 
  Alert, 
  FlatList, 
  RefreshControl, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Text 
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SkillOffer {
  id: string;
  skill: string;
  user: string;
  description: string;
  category: string;
}

const dummyOffers: SkillOffer[] = [
  { id: '1', skill: 'Python Tutoring', user: 'Ali', description: 'Learn Python fundamentals from scratch.', category: 'Programming' },
  { id: '2', skill: 'Guitar Lessons', user: 'Fatima', description: 'Acoustic and electric basics with chords and rhythm.', category: 'Music' },
  { id: '3', skill: 'Drawing Basics', user: 'Ahmed', description: 'Pencil drawing, shading, and composition for beginners.', category: 'Art' },
  { id: '4', skill: 'Yoga & Meditation', user: 'Sara', description: 'Breathing, stretching, and mindfulness practices.', category: 'Wellness' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOffers, setFilteredOffers] = useState(dummyOffers);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const backgroundColor = useThemeColor({}, 'background');
  const headerBackgroundColor = useThemeColor({}, 'backgroundElevated');
  const searchBackgroundColor = useThemeColor({}, 'backgroundSecondary');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredOffers(dummyOffers);
      setRefreshing(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredOffers(dummyOffers);
    } else {
      const filtered = dummyOffers.filter(offer =>
        offer.skill.toLowerCase().includes(query.toLowerCase()) ||
        offer.description.toLowerCase().includes(query.toLowerCase()) ||
        offer.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOffers(filtered);
    }
  };

  const handleOfferPress = (offer: SkillOffer) => {
    Alert.alert(
      offer.skill,
      `Offered by: ${offer.user}\n\n${offer.description}\n\nCategory: ${offer.category}`,
      [
        { text: 'Close', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => {
            Alert.alert('Success', `Connection request sent to ${offer.user}!`);
          }
        }
      ]
    );
  };

  const renderOffer = ({ item }: { item: SkillOffer }) => (
    <TouchableOpacity 
      style={styles.offerCard}
      onPress={() => handleOfferPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.offerHeader}>
        <Text style={styles.skillName}>{item.skill}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      
      <Text style={styles.userName}>Offered by {item.user}</Text>
      
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.offerFooter}>
        <Text style={styles.rating}>⭐ 4.8</Text>
        <Text style={styles.learnMore}>Learn More →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <Text style={styles.welcomeText}>
          Welcome back, {user?.name.split(' ')[0]}!
        </Text>
        <Text style={styles.title}>SkillSwap</Text>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: searchBackgroundColor }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search skills, categories, or descriptions..."
          placeholderTextColor={Colors.light.inputPlaceholder}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredOffers}
        keyExtractor={item => item.id}
        renderItem={renderOffer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No skills found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search terms or explore all available skills.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: 60,
    ...Shadows.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  welcomeText: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  searchContainer: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  searchInput: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: Typography.base,
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    ...Shadows.sm,
  },
  listContent: {
    padding: Spacing.lg,
  },
  offerCard: {
    backgroundColor: Colors.light.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.sm,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  skillName: {
    flex: 1,
    fontSize: Typography.lg,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: Spacing.sm,
  },
  categoryBadge: {
    backgroundColor: Colors.light.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    color: Colors.light.primary,
    fontSize: Typography.xs,
    fontWeight: '600',
  },
  userName: {
    fontSize: Typography.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.light.text,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: Typography.sm,
    color: Colors.light.textTertiary,
  },
  learnMore: {
    fontSize: Typography.sm,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.xl,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Typography.base,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
});