export interface ILeaveHistory{
    leaveId?:number,
    leaveType:string,
    leaveDuration:string,
    startDate:Date,
    endDate?:Date,
    noonType?:string,
    appliedAt:Date,
    status:string,
    approvedBy:number,
    remarks?:string
}