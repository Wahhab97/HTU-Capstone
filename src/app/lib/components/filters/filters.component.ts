import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SectorsService} from "../../services/sectors/sectors.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Filter} from "../../interfaces/filter";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit{
  constructor(private sectorsService: SectorsService) {}
  @Output() filterEvent = new EventEmitter<Filter>();
  addFilter(value: Filter) {
    this.filterEvent.emit(value);
    this.filersForm.reset();
  }
  panelOpenState= false;
  sectors: string[] = [];

  filersForm = new FormGroup({
    sector: new FormControl(),
    comName: new FormControl()
  });

  ngOnInit() {
    this.sectorsService.getSectors().subscribe({
      next: (value) => {
        if(value) {
          value.forEach((sec) => {
            this.sectors.push(sec.sectorName);
          })
        }
      },
      error: err => console.error(err)
    })
  }
}
