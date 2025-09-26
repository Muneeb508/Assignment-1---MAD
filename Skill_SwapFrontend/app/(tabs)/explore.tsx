import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
  Alert, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Text 
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const categories = [
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'language', label: 'Language', emoji: '🗣️' },
  { id: 'art', label: 'Art', emoji: '🎨' },
  { id: 'programming', label: 'Programming', emoji: '💻' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'other', label: 'Other', emoji: '✨' },
];

export default function CreatePostScreen() {
  const [skill, setSkill] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const headerBackgroundColor = useThemeColor({}, 'backgroundElevated');
  const inputBackgroundColor = useThemeColor({}, 'inputBackground');

  const handlePost = async () => {
    if (!skill.trim() || !description.trim()) {
      Alert.alert('Incomplete', 'Please enter both a skill name and description.');
      return;
    }
    
    if (!selectedCategory) {
      Alert.alert('Incomplete', 'Please select a category.');
      return;
    }

    setIsPosting(true);
    
    // Simulate posting
    console.log('Create Post:', { title: skill, description, category: selectedCategory });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsPosting(false);
    
    Alert.alert('Posted', 'Your skill has been posted successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setSkill('');
          setDescription('');
          setSelectedCategory('');
          router.replace('/(tabs)');
        }
      }
    ]);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <Text style={styles.title}>Create New Skill</Text>
        <Text style={styles.subtitle}>Share your knowledge with others</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Skill Name *</Text>
            <TextInput
              placeholder="e.g. Python Programming, Guitar Lessons, Cooking"
              placeholderTextColor={Colors.light.inputPlaceholder}
              value={skill}
              onChangeText={setSkill}
              style={[styles.input, { backgroundColor: inputBackgroundColor }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <View style={styles.categoriesRow}>
                {categories.map(cat => {
                  const selected = selectedCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => handleCategorySelect(cat.id)}
                      style={[styles.categoryChip, selected && styles.categoryChipSelected]}
                    >
                      <Text style={[styles.categoryChipText, selected && styles.categoryChipTextSelected]}>
                        {cat.emoji} {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              placeholder="Describe what you offer, your experience level, what students can expect to learn..."
              placeholderTextColor={Colors.light.inputPlaceholder}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              style={[styles.input, styles.textArea, { backgroundColor: inputBackgroundColor }]}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.postButton, isPosting && styles.postButtonDisabled]}
            onPress={handlePost}
            disabled={isPosting}
          >
            <Text style={styles.postButtonText}>
              {isPosting ? 'Posting...' : 'Post Skill'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.note}>
            * Required fields. Your skill will be visible to other users.
          </Text>
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
    ...Shadows.sm,
  },
  title: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.light.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  form: {
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: Typography.base,
    ...Shadows.sm,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginTop: Spacing.sm,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: Colors.light.inputBorder,
    backgroundColor: Colors.light.background,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  categoryChipSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryChipText: {
    fontSize: Typography.sm,
    color: Colors.light.text,
  },
  categoryChipTextSelected: {
    color: Colors.light.textInverse,
  },
  postButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  postButtonDisabled: {
    backgroundColor: Colors.light.buttonPrimaryDisabled,
  },
  postButtonText: {
    fontSize: Typography.lg,
    fontWeight: '600',
    color: Colors.light.textInverse,
  },
  note: {
    fontSize: Typography.sm,
    color: Colors.light.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});