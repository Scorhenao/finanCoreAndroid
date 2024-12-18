import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {useCategories} from '../hooks/useCategories';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Loading from '../components/loading';
import {notify} from '../components/NotificationManager';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../common/types/Navigation-types';

const CategoriesScreen = () => {
  const {theme} = useTheme();
  const {createCategory, fetchCategories, loading, error, successMessage} =
    useCategories();
  const [categoryName, setCategoryName] = useState('');
  const route = useRoute();
  const {params} = route;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const categories = params?.categories || [];

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      return;
    }

    try {
      await createCategory(categoryName);
      setCategoryName('');
      notify('success', 'Category Created', '');
      fetchCategories();
      navigation.goBack();
    } catch (err: any) {
      notify('danger', 'Error Creating Category', err.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [fetchCategories]),
  );

  return (
    <FlatList
      contentContainerStyle={[
        styles.scrollView,
        {backgroundColor: theme.colors.backgrounds},
      ]}
      ListHeaderComponent={
        <>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, {color: theme.colors.texts}]}>
              Category Name:
            </Text>
            <View style={styles.inputWithIcon}>
              <Icon
                name="create-outline"
                size={20}
                color={theme.colors.texts}
              />
              <TextInput
                style={[
                  styles.input,
                  {color: theme.colors.texts, borderColor: theme.colors.inputs},
                ]}
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="Enter category name"
                placeholderTextColor={theme.colors.texts}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: theme.colors.buttons}]}
            onPress={handleAddCategory}>
            <Text style={{color: theme.colors.texts}}>Add Category</Text>
          </TouchableOpacity>

          {loading && <Loading />}

          {error && <Text style={{color: 'red'}}>{error}</Text>}
          {successMessage && (
            <Text style={{color: theme.colors.hovers}}>{successMessage}</Text>
          )}

          <View style={styles.categoryList}>
            <Text style={[styles.title, {color: theme.colors.texts}]}>
              Categories:
            </Text>
          </View>
        </>
      }
      data={categories}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.categoryItem}>
          <Text style={{color: theme.colors.texts}}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  categoryList: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default CategoriesScreen;
