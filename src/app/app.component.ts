import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-resize-observer-error-repro';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    // provoke ResizeObserver loop limit exceeded error
    let counter = 0;
    const observer = new ResizeObserver(entries => {
      const target = entries[0].target as HTMLElement;
      target.style.width = `${target.offsetWidth - 1}px`;
      counter++;
      if (counter > 5) {
        observer.disconnect();
      }
    });
    observer.observe(this.elementRef.nativeElement);
  }
}
