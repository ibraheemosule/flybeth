import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Users,
  Search,
  Send,
  Edit,
  Trash2,
  Shield,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  UserX,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  accessLevel: "admin" | "manager" | "employee";
  department: string;
  joinDate: string;
  status: "active" | "inactive";
  totalBookings: number;
  totalSpent: string;
  location: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@techinnovations.com",
    phone: "+1 555 123 4567",
    role: "Sales Director",
    accessLevel: "admin",
    department: "Sales",
    joinDate: "2022-01-15",
    status: "active",
    totalBookings: 24,
    totalSpent: "$18,420",
    location: "New York, NY",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@techinnovations.com",
    phone: "+1 555 234 5678",
    role: "VP Engineering",
    accessLevel: "admin",
    department: "Engineering",
    joinDate: "2021-08-20",
    status: "active",
    totalBookings: 19,
    totalSpent: "$15,280",
    location: "San Francisco, CA",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@techinnovations.com",
    phone: "+1 555 345 6789",
    role: "Marketing Manager",
    accessLevel: "manager",
    department: "Marketing",
    joinDate: "2022-03-10",
    status: "active",
    totalBookings: 16,
    totalSpent: "$12,940",
    location: "Los Angeles, CA",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@techinnovations.com",
    phone: "+1 555 456 7890",
    role: "Product Manager",
    accessLevel: "manager",
    department: "Product",
    joinDate: "2022-06-01",
    status: "active",
    totalBookings: 14,
    totalSpent: "$11,680",
    location: "Austin, TX",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@techinnovations.com",
    phone: "+1 555 567 8901",
    role: "Senior Developer",
    accessLevel: "employee",
    department: "Engineering",
    joinDate: "2023-01-15",
    status: "active",
    totalBookings: 8,
    totalSpent: "$6,240",
    location: "Seattle, WA",
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.t@techinnovations.com",
    phone: "+1 555 678 9012",
    role: "Sales Associate",
    accessLevel: "employee",
    department: "Sales",
    joinDate: "2023-04-20",
    status: "active",
    totalBookings: 6,
    totalSpent: "$4,180",
    location: "Chicago, IL",
  },
];

export function EmployeesSection() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterAccessLevel, setFilterAccessLevel] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState("");
  const [inviteCodeCopied, setInviteCodeCopied] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Employee>>({});

  // Load or generate invite code on mount
  useEffect(() => {
    const storedCode = localStorage.getItem("flybeth-company-invite-code");
    if (storedCode) {
      setCurrentInviteCode(storedCode);
    }
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || emp.department === filterDepartment;
    const matchesAccessLevel =
      filterAccessLevel === "all" || emp.accessLevel === filterAccessLevel;
    return matchesSearch && matchesDepartment && matchesAccessLevel;
  });

  const departments = ["all", ...Array.from(new Set(employees.map((e) => e.department)))];

  const generateInviteCode = () => {
    // Generate a unique invite code
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCode = `FLYBETH-${timestamp}-${random}`;
    
    // Store the new code (invalidates old one)
    localStorage.setItem("flybeth-company-invite-code", newCode);
    
    // Store company info with the code
    const companyDetails = JSON.parse(localStorage.getItem("flybeth-company-details") || "{}");
    localStorage.setItem(`flybeth-invite-${newCode}`, JSON.stringify({
      companyName: companyDetails.companyName || "Tech Innovations Inc.",
      companyEmail: companyDetails.companyEmail,
      createdAt: new Date().toISOString(),
    }));
    
    setCurrentInviteCode(newCode);
    setShowInviteModal(true);
    setInviteCodeCopied(false);
    toast.success("New invite code generated! Previous code is now invalid.");
  };

  const copyInviteCode = () => {
    // Fallback for clipboard API
    const textArea = document.createElement("textarea");
    textArea.value = currentInviteCode;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      setInviteCodeCopied(true);
      toast.success("Invite code copied to clipboard!");
      setTimeout(() => setInviteCodeCopied(false), 3000);
    } catch (err) {
      toast.error("Failed to copy. Please copy manually.");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditForm({
      role: employee.role,
      accessLevel: employee.accessLevel,
      department: employee.department,
      phone: employee.phone,
      location: employee.location,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedEmployee) return;

    setEmployees(
      employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, ...editForm } : emp
      )
    );
    toast.success(`${selectedEmployee.name}'s profile updated successfully`);
    setShowEditModal(false);
  };

  const handleToggleStatus = (employee: Employee) => {
    const newStatus = employee.status === "active" ? "inactive" : "active";
    setEmployees(
      employees.map((emp) =>
        emp.id === employee.id ? { ...emp, status: newStatus } : emp
      )
    );
    toast.success(
      `${employee.name} ${newStatus === "active" ? "activated" : "deactivated"}`
    );
  };

  const handleRemoveEmployee = (employee: Employee) => {
    if (confirm(`Are you sure you want to remove ${employee.name} from the company?`)) {
      setEmployees(employees.filter((emp) => emp.id !== employee.id));
      toast.success(`${employee.name} removed from company`);
      setShowDetailsModal(false);
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "manager":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Employees</h2>
        <p className="text-muted-foreground">
          Manage team members, roles, and access levels
        </p>
      </div>

      {/* Current Invite Code Display */}
      {currentInviteCode && (
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Current Invite Code
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share this code with employees to join the company
              </p>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-primary/20 max-w-fit">
                <code className="font-mono text-lg font-semibold text-primary">{currentInviteCode}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyInviteCode}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  {inviteCodeCopied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-primary" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={generateInviteCode}
              className="border-primary text-primary hover:bg-primary/5 sm:shrink-0"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Code
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Search */}
          <div className="sm:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <Select
              value={filterDepartment}
              onValueChange={(e) => setFilterDepartment(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterDepartment === "all" ? "All Departments" : filterDepartment}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Access Level Filter */}
          <div>
            <Select
              value={filterAccessLevel}
              onValueChange={(e) => setFilterAccessLevel(e)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <SelectTrigger className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <SelectValue>
                  {filterAccessLevel === "all" ? "All Access Levels" : filterAccessLevel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access Levels</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      {/* Employees Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            <Card className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-lg">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(employee)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Role & Access
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(employee)}>
                      {employee.status === "active" ? (
                        <>
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleRemoveEmployee(employee)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove from Company
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {employee.location}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className={getAccessLevelColor(employee.accessLevel)}
                >
                  <Shield className="mr-1 h-3 w-3" />
                  {employee.accessLevel.charAt(0).toUpperCase() +
                    employee.accessLevel.slice(1)}
                </Badge>
                <Badge variant="outline">{employee.department}</Badge>
                {employee.status === "active" ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    Inactive
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Bookings</p>
                  <p className="font-semibold">{employee.totalBookings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                  <p className="font-semibold text-primary">{employee.totalSpent}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Invite Code Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Company Invite Code Generated
            </DialogTitle>
            <DialogDescription>
              Share this code with employees to join your company
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Invite Code Display */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground mb-3">Your Invite Code</p>
              <div className="font-mono text-2xl font-bold text-primary mb-4 break-all">
                {currentInviteCode}
              </div>
              <Button
                onClick={copyInviteCode}
                className="w-full bg-gradient-to-r from-primary to-accent text-white"
              >
                {inviteCodeCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="font-semibold">How employees can join:</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Go to Settings → Profile page</li>
                <li>Find "Join Company Using Invite Code" section</li>
                <li>Enter this invite code</li>
                <li>Click "Join Company"</li>
              </ol>
            </div>

            {/* Warning */}
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Generating a new invite code will invalidate this one. Share it with your team before creating a new code.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-2xl">
                  {selectedEmployee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.role}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={getAccessLevelColor(selectedEmployee.accessLevel)}
                    >
                      {selectedEmployee.accessLevel}
                    </Badge>
                    <Badge variant="outline">{selectedEmployee.department}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="mt-1">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="mt-1">{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="mt-1">{selectedEmployee.location}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Join Date</Label>
                    <p className="mt-1">
                      {new Date(selectedEmployee.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Booking Statistics</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {selectedEmployee.totalBookings}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-green-700">
                      {selectedEmployee.totalSpent}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditEmployee(selectedEmployee);
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Employee
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRemoveEmployee(selectedEmployee)}
                  className="text-destructive border-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update role, access level, and other details for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-role">Job Role</Label>
              <Input
                id="edit-role"
                value={editForm.role || ""}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-access">Access Level</Label>
              <select
                id="edit-access"
                value={editForm.accessLevel || "employee"}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    accessLevel: e.target.value as Employee["accessLevel"],
                  })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background mt-2"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={editForm.department || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, department: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={editForm.phone || ""}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editForm.location || ""}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}