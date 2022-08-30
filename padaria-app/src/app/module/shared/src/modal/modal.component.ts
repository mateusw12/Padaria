import {
  Component,
  ContentChild,
  Injectable,
  Input,
  OnInit,
  Self,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewRefreshService } from '../view-refresh/view-refresh.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [ViewRefreshService],
  encapsulation: ViewEncapsulation.None,
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input()
  modalHeader: string = '';

  @Input()
  closeButton = true;

  @Input()
  closeEsc = true;

  @Input()
  dialogClass: string | undefined;

  @Input()
  bodyClass: string = '';

  @ViewChild('modal')
  private modal!: TemplateRef<ModalComponent>;

  @ContentChild('bodyTemplate', { static: true })
  bodyTemplate: TemplateRef<any> | undefined | null;

  @ContentChild('footerTemplate', { static: true })
  footerTemplate: TemplateRef<any> | undefined | null;

  private modalRef!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    @Self() private viewRefreshService: ViewRefreshService
  ) {}

  ngOnInit(): void {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.viewRefreshService.refresh(300);
      this.modalRef = this.modalService.open(this.modal, {
        size: this.dialogClass ? this.dialogClass : 'md',
        modalDialogClass: this.bodyClass,
        backdrop: 'static',
        scrollable: true,
      });
      this.modalRef.result.then(resolve, resolve);
    });
  }

  onCloseClick(): void {
    if (!this.closeButton) return;
    this.close();
  }

  onEscKeyDown(): void {
    if (!this.closeEsc) return;
    this.close();
  }

  private async close(): Promise<void> {
    this.modalService.dismissAll();
  }
}
