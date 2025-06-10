export interface ILeaveApply{
    leaveType:string,
    leaveDuration:string,
    startDate:string,
    endDate?:string,
    noonType?:string,
    reason:string,
    expectedDateOfDelivery?:string,
    adopted?:boolean,
    adoptedDate?:string,
    adoptedChildAgeInMonths?:number
}