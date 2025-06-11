export interface IQuarterlyLeaveBalance{
    employeeId:number,
    year:number,
    quarter:string,
    leaveType:string,
    carryForward:number,
    maternityLeave:number,
    entitledDays:number,
    usedDays:number,
    advanceLeaveTaken:number,
    paternityLeave:number,
    createdAt:string,
    updatedAt:string
}