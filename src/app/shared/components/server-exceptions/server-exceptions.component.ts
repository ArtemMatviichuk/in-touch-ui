import { Component, Input, OnInit } from '@angular/core';
import { ServerExceptions } from '../../types/server-exception.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'it-server-exceptions',
  templateUrl: './server-exceptions.component.html',
  styleUrls: ['./server-exceptions.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ServerExceptionsComponent implements OnInit {
  @Input() serverExceptions: ServerExceptions = {};

  public entries: [string, string[]][] = [];

  public ngOnInit(): void {
    this.entries = Object.entries(this.serverExceptions);
  }
}
