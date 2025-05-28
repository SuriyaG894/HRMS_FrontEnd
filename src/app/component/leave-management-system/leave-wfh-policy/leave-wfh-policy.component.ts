import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-leave-wfh-policy',
  imports: [PdfViewerModule],
  templateUrl: './leave-wfh-policy.component.html',
  styleUrl: './leave-wfh-policy.component.css'
})
export class LeaveWfhPolicyComponent {

pdfBlobUrl:SafeResourceUrl|null= "";
  page: number = 1;
  totalPages: number = 0;

constructor(private sanitizer: DomSanitizer,private http:HttpClient,private cdRef: ChangeDetectorRef) {}
ngOnInit(): void {
  this.loadPdfFromApi();
}

loadPdfFromApi() {
  // Replace this with your actual service call
  this.http.get('http://localhost:8765/api/leave/policy', { responseType: 'blob' })
    .subscribe(blob => {
      console.log("PDF BLOB",blob);
      const url = URL.createObjectURL(blob);
      this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      // this.pdfBlobUrl = url;
      console.log("Blob url created",this.pdfBlobUrl);
      this.cdRef.detectChanges();
      // window.open(this.pdfBlobUrl, '_blank');
    });
}

onPdfLoaded(pdf: any) {
    this.totalPages = pdf.numPages;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

}
