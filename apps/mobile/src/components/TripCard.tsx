import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDate, formatPrice } from "@packages/shared-utils";

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  status: string;
}

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.destination}>{trip.destination}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(trip.status) },
          ]}
        >
          <Text style={styles.statusText}>{trip.status}</Text>
        </View>
      </View>

      <View style={styles.dateRow}>
        <Text style={styles.dateLabel}>Dates:</Text>
        <Text style={styles.dateText}>
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.priceText}>{formatPrice(trip.price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  destination: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  dateRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    width: 60,
  },
  dateText: {
    fontSize: 14,
    color: "#1e293b",
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
  },
  priceLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    width: 60,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
    flex: 1,
  },
});
