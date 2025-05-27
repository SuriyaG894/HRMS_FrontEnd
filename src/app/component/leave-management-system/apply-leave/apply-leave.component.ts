import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-leave',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css'
})
export class ApplyLeaveComponent {


  selectedDate1: string = '';

  toggle:boolean = false;

selectedDate2: string = '';
showDate:boolean = true;

  leaveForm!: FormGroup;
  showNoonType = false;
  showEndDate = false;

  leaveTypes = ['CASUAL_LEAVE', 'SICK_LEAVE', 'MARRIAGE'];
  durationTypes = ['FULL_DAY', 'HALF_DAY'];
  noonTypes = ['FN', 'AN'];

  // Flag to prevent recursive loops when updating form controls programmatically
  private updatingForm = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: [null, Validators.required],
      leaveDurationType: [null, Validators.required],
      noonType: [null],
      startDate: [null, Validators.required],
      endDate: [null],
      reason: [null, Validators.required],
    }, { validators: this.leaveDateValidator() });

    this.leaveForm.valueChanges.subscribe(() => {
      if (!this.updatingForm) {
        this.safeUpdateFormVisibility();
      }
    });

    this.safeUpdateFormVisibility();
  }

  private safeUpdateFormVisibility(): void {
    this.updatingForm = true;

    const leaveType = this.leaveForm.get('leaveType')?.value;
    const durationType = this.leaveForm.get('leaveDurationType')?.value;

    const leaveDurationCtrl = this.leaveForm.get('leaveDurationType');
    const noonTypeCtrl = this.leaveForm.get('noonType');
    const endDateCtrl = this.leaveForm.get('endDate');

    this.showNoonType = false;
    this.showEndDate = false;

    if (leaveType === 'MARRIAGE') {
      // Force FULL_DAY for MARRIAGE and disable selection
      if (leaveDurationCtrl?.value !== 'FULL_DAY') {
        leaveDurationCtrl?.setValue('FULL_DAY', { emitEvent: false });
      }
      leaveDurationCtrl?.disable();
      this.showEndDate = true;
    } else {
      leaveDurationCtrl?.enable();

      if (durationType === 'HALF_DAY' && (leaveType === 'CASUAL_LEAVE' || leaveType === 'SICK_LEAVE')) {
        this.showNoonType = true;
        this.showEndDate = false;
      } else if (durationType === 'FULL_DAY') {
        this.showNoonType = false;
        this.showEndDate = true;
      } else {
        // Default fallback
        this.showNoonType = false;
        this.showEndDate = false;
      }
    }

    // Set validators conditionally
    noonTypeCtrl?.setValidators(this.showNoonType ? Validators.required : null);
    endDateCtrl?.setValidators(this.showEndDate ? Validators.required : null);

    noonTypeCtrl?.updateValueAndValidity({ emitEvent: false });
    endDateCtrl?.updateValueAndValidity({ emitEvent: false });

    this.updatingForm = false;
  }

  private leaveDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const leaveType = control.get('leaveType')?.value;
      const startDateStr = control.get('startDate')?.value;
      const endDateStr = control.get('endDate')?.value;

      if (!startDateStr) return null; // Required validator handles empty

      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize

      const startDate = new Date(startDateStr);
      startDate.setHours(0, 0, 0, 0);

      const endDate = endDateStr ? new Date(endDateStr) : null;
      if (endDate) endDate.setHours(0, 0, 0, 0);

      const errors: ValidationErrors = {};

      // 1. For leave types except SICK_LEAVE, dates must be today or future
      if (leaveType && leaveType !== 'SICK_LEAVE') {
        if (startDate < today) {
          errors['startDatePast'] = 'Start date cannot be in the past';
        }
        if (endDate && endDate < today) {
          errors['endDatePast'] = 'End date cannot be in the past';
        }
      }

      // 2. startDate cannot be after endDate (if endDate exists)
      if (endDate && startDate > endDate) {
        errors['startAfterEnd'] = 'Start date cannot be after end date';
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  onSubmit(): void {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted:', this.leaveForm.value);
    // Call your API here
//     this.leaveApplyService.applyLeave(this.leaveForm.value).subscribe({
//       next:(response)=>{
//         console.log();
//         Swal.fire({
//   title: "Leave Status",
//   text: response.message,
//   icon: "success"
// });
        this.leaveForm.reset()
//       },
//       error:(error)=>{
//         console.log(error)
//         Swal.fire({
//   title: "Leave Status",
//   text: error.error,
//   icon: "error"
// });
    //   }
    // })    
  }

}
