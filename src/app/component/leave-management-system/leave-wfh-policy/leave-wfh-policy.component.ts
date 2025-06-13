import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-wfh-policy',
  imports: [PdfViewerModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './leave-wfh-policy.component.html',
  styleUrl: './leave-wfh-policy.component.css'
})
export class LeaveWfhPolicyComponent {

pdfBlobUrl: SafeResourceUrl | null = null;
  page: number = 1;
  totalPages: number = 0;
  roles: string | null = "USER";
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadPdfFromApi();
    this.roles = localStorage.getItem('selectedRole');
    console.log(this.roles)
  }

  loadPdfFromApi(): void {
  this.http.get('http://localhost:8765/api/leave/policy', { responseType: 'blob' })
    .subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load PDF:', err);
        // Optionally show a user-friendly message
        Swal.fire({
          icon: 'error',
          title: 'PDF Load Failed',
          text: 'Leave Policy not uploaded. Contact HR for further details',
          confirmButtonColor: '#d33'
        });
        
      }
    });
}


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      Swal.fire('Invalid File', 'Only PDF files are allowed.', 'error');
      event.target.value = '';
    }
  }

  submit(): void {
    if (!this.selectedFile) {
      Swal.fire('No File Selected', 'Please choose a PDF file to upload.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('uploadedBy', 'HR');
    formData.append('version', 'v1');

    this.http.post('http://localhost:8765/api/hr/upload-policy', formData, {
      reportProgress: true,
      observe: 'events',
      responseType:'text'as 'json'
    }).subscribe({
    next: (event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response) {
        Swal.fire('Success', 'Leave policy uploaded successfully.', 'success');
        this.selectedFile = null;
        this.loadPdfFromApi(); // Refresh PDF
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Upload failed:', error);
      Swal.fire('Upload Failed', error.error?.message || 'Something went wrong.', 'error');
    }
  });
  }

}
