export interface IYearlyLeaveBalance{
    employeeId:number,
    year:number,
    totalEarnedLeave:number,
    totalUsedLeave:number,
    totalAdvanceLeave:number,
    totalAvailableLeave:number,
    carryForwardLeave:number
}