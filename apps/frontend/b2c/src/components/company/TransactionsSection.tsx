import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Eye,
  CreditCard,
  Calendar,
  User,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { toast } from "sonner";
import { useThemeStore } from "../../stores";

interface Transaction {
  id: string;
  transactionId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  description: string;
  amount: number;
  type: "debit" | "credit" | "refund";
  category: "flight" | "hotel" | "car" | "package" | "other";
  date: string;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN-2024-001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@example.com",
    department: "Sales",
    description: "Flight booking - New York to London",
    amount: 1240,
    type: "debit",
    category: "flight",
    date: "2024-01-05T10:30:00",
    paymentMethod: "Company Card ****4532",
    status: "completed",
  },
  {
    id: "2",
    transactionId: "TXN-2024-002",
    employeeName: "Michael Chen",
    employeeEmail: "michael.chen@example.com",
    department: "Engineering",
    description: "Hotel reservation - Hilton San Francisco",
    amount: 890,
    type: "debit",
    category: "hotel",
    date: "2024-01-04T15:45:00",
    paymentMethod: "Company Card ****4532",
    status: "completed",
  },
  {
    id: "3",
    transactionId: "TXN-2024-003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@example.com",
    department: "Marketing",
    description: "Flight cancellation refund",
    amount: 580,
    type: "refund",
    category: "flight",
    date: "2024-01-03T09:20:00",
    paymentMethod: "Company Card ****4532",
    status: "completed",
  },
  {
    id: "4",
    transactionId: "TXN-2024-004",
    employeeName: "James Wilson",
    employeeEmail: "james.wilson@example.com",
    department: "Product",
    description: "Car rental - Enterprise BMW 5 Series",
    amount: 420,
    type: "debit",
    category: "car",
    date: "2024-01-02T14:10:00",
    paymentMethod: "Company Card ****8921",
    status: "completed",
  },
  {
    id: "5",
    transactionId: "TXN-2024-005",
    employeeName: "Lisa Anderson",
    employeeEmail: "lisa.anderson@example.com",
    department: "Engineering",
    description: "Vacation package - Miami Beach",
    amount: 2890,
    type: "debit",
    category: "package",
    date: "2023-12-28T11:30:00",
    paymentMethod: "Company Card ****4532",
    status: "completed",
  },
  {
    id: "6",
    transactionId: "TXN-2024-006",
    employeeName: "Robert Taylor",
    employeeEmail: "robert.taylor@example.com",
    department: "Sales",
    description: "Flight booking - Chicago to Boston",
    amount: 320,
    type: "debit",
    category: "flight",
    date: "2023-12-20T16:50:00",
    paymentMethod: "Company Card ****8921",
    status: "completed",
  },
];

export function TransactionsSection() {
  const { getCurrentColors } = useThemeStore();
  const themeColors = getCurrentColors();

  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch =
      txn.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEmployee =
      filterEmployee === "all" || txn.employeeName === filterEmployee;
    const matchesType = filterType === "all" || txn.type === filterType;
    const matchesCategory =
      filterCategory === "all" || txn.category === filterCategory;
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus;

    const matchesDateFrom =
      !dateFrom || new Date(txn.date) >= new Date(dateFrom);
    const matchesDateTo = !dateTo || new Date(txn.date) <= new Date(dateTo);

    return (
      matchesSearch &&
      matchesEmployee &&
      matchesType &&
      matchesCategory &&
      matchesStatus &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const employees = [
    "all",
    ...Array.from(new Set(transactions.map(t => t.employeeName))),
  ];

  const totalDebits = filteredTransactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCredits = filteredTransactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = filteredTransactions
    .filter(t => t.type === "refund")
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalDebits - totalCredits - totalRefunds;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "debit":
        return "text-red-600";
      case "credit":
        return "text-green-600";
      case "refund":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleExportData = () => {
    toast.success("Transaction data exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-muted-foreground">
            Financial overview and payment history
          </p>
        </div>
        <Button
          onClick={handleExportData}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Transactions
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-50">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Debits</p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            ${totalDebits.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filteredTransactions.filter(t => t.type === "debit").length}{" "}
            transactions
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-50">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Credits</p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${totalCredits.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filteredTransactions.filter(t => t.type === "credit").length}{" "}
            transactions
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground">Total Refunds</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            ${totalRefunds.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filteredTransactions.filter(t => t.type === "refund").length}{" "}
            transactions
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm text-muted-foreground">Net Amount</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            ${netAmount.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {filteredTransactions.length} total transactions
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Filters</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Transaction ID, Email, Name, or Description..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Search filters: Transaction ID, Employee Email, Employee Name,
              Description
            </p>
          </div>

          {/* Employee Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Employee
            </Label>
            <Select
              value={filterEmployee}
              onValueChange={e => setFilterEmployee(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterEmployee === "all" ? "All Employees" : filterEmployee}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp} value={emp}>
                    {emp === "all" ? "All Employees" : emp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Transaction Type
            </Label>
            <Select
              value={filterType}
              onValueChange={e => setFilterType(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterType === "all" ? "All Types" : filterType}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Category
            </Label>
            <Select
              value={filterCategory}
              onValueChange={e => setFilterCategory(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterCategory === "all" ? "All Categories" : filterCategory}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="package">Package</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Status
            </Label>
            <Select
              value={filterStatus}
              onValueChange={e => setFilterStatus(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterStatus === "all" ? "All Statuses" : filterStatus}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Date From
            </Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Date To
            </Label>
            <Input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterEmployee("all");
                setFilterType("all");
                setFilterCategory("all");
                setFilterStatus("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map(txn => (
          <motion.div
            key={txn.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      txn.type === "debit"
                        ? "bg-red-50"
                        : txn.type === "credit"
                        ? "bg-green-50"
                        : "bg-blue-50"
                    }`}
                  >
                    {txn.type === "debit" ? (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    ) : txn.type === "credit" ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold">{txn.description}</h3>
                    <Badge
                      variant="outline"
                      className={getStatusColor(txn.status)}
                    >
                      {txn.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {txn.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>👤 {txn.employeeName}</span>
                    <span>🏢 {txn.department}</span>
                    <span>💳 {txn.paymentMethod}</span>
                    <span>
                      📅 {new Date(txn.date).toLocaleDateString()}{" "}
                      {new Date(txn.date).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p
                      className={`text-2xl font-bold ${getTypeColor(txn.type)}`}
                    >
                      {txn.type === "debit" ? "-" : "+"}$
                      {txn.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {txn.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {filteredTransactions.length === 0 && (
          <Card className="p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground">
              No transactions found matching your filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterEmployee("all");
                setFilterType("all");
                setFilterCategory("all");
                setFilterStatus("all");
                setDateFrom("");
                setDateTo("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
