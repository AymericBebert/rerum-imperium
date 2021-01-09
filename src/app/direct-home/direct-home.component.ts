import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThingsService} from '../service/things.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {StorageService} from '../storage/storage.service';

@Component({
  selector: 'app-direct-home',
  templateUrl: './direct-home.component.html',
  styleUrls: ['./direct-home.component.scss']
})
export class DirectHomeComponent implements OnInit, OnDestroy {
  private static DEVICE_URL_KEY = 'ri_device_url';

  public deviceUrlControl: FormControl;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private thingsService: ThingsService,
              private storageService: StorageService,
  ) {
    this.deviceUrlControl = new FormControl(this.storageService.getItem(DirectHomeComponent.DEVICE_URL_KEY) || '');
  }

  ngOnInit(): void {
    this.deviceUrlControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.storageService.setItem(DirectHomeComponent.DEVICE_URL_KEY, value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public runAnimation(animation: string) {
    this.thingsService.putAnimation(this.deviceUrlControl.value, animation)
      .subscribe(running => console.log(`Running ${running}`));
  }
}
