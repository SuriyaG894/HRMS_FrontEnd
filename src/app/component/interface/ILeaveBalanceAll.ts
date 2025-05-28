export interface ILeaveBalanceAll {
  id: number;
  employeeId: number;
  year: number;
  quarter: string;         // e.g., 'Q1', 'Q2', 'Q3', 'Q4'
  leaveType: string;       // e.g., 'SICK', 'CASUAL'
  entitledDays: number;
  usedDays: number;
  advanceLeaveTaken: number;
  maternityLeave: number;
  paternityLeave: number;
}