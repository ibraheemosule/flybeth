import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';
import TripBookingForm from '../components/TripBookingForm';
import TripCard from '../components/TripCard';

export default function DashboardScreen() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { user, logout } = useAuthStore();
  const { trips, getTrips, isLoading } = useTripStore();

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      await getTrips();
    } catch (error) {
      console.error('Error loading trips:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  const getUserGreeting = () => {
    if (user?.userType === 'business') {
      return 'Hello business user';
    }
    return 'Hello independent user';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getUserGreeting()}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadTrips} />
        }
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Trips</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => setShowBookingForm(true)}
            >
              <Text style={styles.bookButtonText}>Book Trip</Text>
            </TouchableOpacity>
          </View>

          {trips.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No trips yet</Text>
              <Text style={styles.emptyText}>
                Book your first trip to get started
              </Text>
            </View>
          ) : (
            <View style={styles.tripsList}>
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TripBookingForm
        visible={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        onSuccess={() => {
          setShowBookingForm(false);
          loadTrips();
        }}
        userType={user?.userType}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2563eb',
    borderRadius: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  tripsList: {
    gap: 12,
  },
});