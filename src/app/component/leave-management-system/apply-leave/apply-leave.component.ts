import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ILeaveApply } from '../../interface/ILeaveApply';
import { LeaveService } from '../../../services/leave-management-services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm!: FormGroup;
  primaryApproverName!:string;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group(
      {
        leaveType: ['', Validators.required],
        leaveDurationType: ['FULL_DAY'],
        startDate: ['', Validators.required],
        endDate: [''],
        noonType: [null],
        reason: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/\S+/)]],
        adopted: ['false'],
        adoptedChildAgeInMonths: ['0'],
        expectedDateOfDelivery: [''],
      },
      { validators: this.dateRangeValidator('startDate', 'endDate') }
    );

    this.handleDynamicValidation();

  }

  handleDynamicValidation(): void {
    const leaveTypeCtrl = this.leaveForm.get('leaveType');
    const durationCtrl = this.leaveForm.get('leaveDurationType');
    const reasonCtrl = this.leaveForm.get('reason');
    const startDateCtrl = this.leaveForm.get('startDate');
    const endDateCtrl = this.leaveForm.get('endDate');
    const noonTypeCtrl = this.leaveForm.get('noonType');
    const adoptedCtrl = this.leaveForm.get('adopted');
    const adoptedChildAgeCtrl = this.leaveForm.get('adoptedChildAgeInMonths');
    const expectedDateCtrl = this.leaveForm.get('expectedDateOfDelivery');

    leaveTypeCtrl?.valueChanges.subscribe(type => {
      // Reset everything
      durationCtrl?.enable();
      durationCtrl?.clearValidators();
      reasonCtrl?.setValidators([Validators.required, Validators.minLength(3), Validators.pattern(/\S+/)]);
      expectedDateCtrl?.clearValidators();
      adoptedCtrl?.clearValidators();
      adoptedChildAgeCtrl?.clearValidators();
      adoptedChildAgeCtrl?.setValue('');
      endDateCtrl?.clearValidators();

      // Special handling for ADVANCE_LEAVE
      if (type === 'ADVANCE_LEAVE') {
        durationCtrl?.setValue('FULL_DAY');
        durationCtrl?.disable();
      }

      // Special handling for MATERNITY
      if (type === 'MATERNITY') {
        durationCtrl?.setValue('FULL_DAY');
        reasonCtrl?.setValue('MATERNITY');
        reasonCtrl?.clearValidators(); // optional
        expectedDateCtrl?.setValidators(Validators.required);
        adoptedCtrl?.setValidators(Validators.required);
        endDateCtrl?.setValidators(Validators.required);
        noonTypeCtrl?.disable();
        // Auto-calculate endDate when startDate is selected
        startDateCtrl?.valueChanges.subscribe(startDate => {
          if (startDate) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + 134); // 135 days total
            const formattedEnd = end.toISOString().split('T')[0];
            endDateCtrl?.setValue(formattedEnd);
          }
        });
      } else {
        durationCtrl?.enable();
      }

      reasonCtrl?.updateValueAndValidity();
      durationCtrl?.updateValueAndValidity();
      startDateCtrl?.updateValueAndValidity();
      endDateCtrl?.updateValueAndValidity();
      expectedDateCtrl?.updateValueAndValidity();
      adoptedCtrl?.updateValueAndValidity();
      adoptedChildAgeCtrl?.updateValueAndValidity();
    });

    this.leaveForm.get('leaveDurationType')?.valueChanges.subscribe(duration => {
      if (duration === 'HALF_DAY') {
        endDateCtrl?.disable();
        endDateCtrl?.reset();
        noonTypeCtrl?.setValidators(Validators.required);
      } else {
        endDateCtrl?.enable();
        noonTypeCtrl?.clearValidators();
      }

      endDateCtrl?.updateValueAndValidity();
      noonTypeCtrl?.updateValueAndValidity();
    });

    adoptedCtrl?.valueChanges.subscribe(isAdopted => {
      if (isAdopted === true) {
        adoptedChildAgeCtrl?.setValidators(Validators.required);
         startDateCtrl?.valueChanges.subscribe(startDate => {
          if (startDate) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + 84); // 84 days total
            const formattedEnd = end.toISOString().split('T')[0];
            endDateCtrl?.setValue(formattedEnd);
          }
        });
      } else {
        adoptedChildAgeCtrl?.clearValidators();
        adoptedChildAgeCtrl?.setValue('0');
      }
      adoptedChildAgeCtrl?.updateValueAndValidity();
    });
  }

  dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startKey)?.value;
      const end = group.get(endKey)?.value;
      if (!start || !end) return null;
      return new Date(start) <= new Date(end) ? null : { dateRangeInvalid: true };
    };
  }

  submitForm(): void {
    if (this.leaveForm.valid) {
      this.leaveService.applyLeave(this.leaveForm.value).subscribe({
        next: res => {
          Swal.fire('Leave Status', res.message, 'success');
          this.leaveForm.reset();
        },
        error: err => {
          Swal.fire('Leave Status', err.error?.message, 'error');
        }
      });
    } else {
      this.leaveForm.markAllAsTouched();
    }
  }
}
