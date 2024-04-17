import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AppService, IAlertOptions } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

interface AccountModel {
  username: string,
  verificationCode: string,
  newPassword: string,
  confirmNewPassword: string
}

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})

export class ForgotPasswordDialogComponent implements OnInit {
  @Output() clickButtonSkip = new EventEmitter<boolean>();
  @Output() loadingFullscreen = new EventEmitter<boolean>();

  @ViewChild('miniDialog', { static: true }) miniDialog!: ElementRef<HTMLDivElement>;
  @ViewChild('btnSubmit', { static: true }) btnSubmit!: ElementRef;

  accountModel: AccountModel = {
    username: "",
    verificationCode: "",
    newPassword: "",
    confirmNewPassword: ""
  };

  checkUsername: boolean = false;

  checkCode: boolean = false;

  checkNewPassword: boolean = false;

  showInputUsername: boolean = true;

  showTitleTimeRemaining: boolean = false;
  showTitleEnterVerificationCode: boolean = false;
  showInputVerificationCode: boolean = false;

  showInputNewPassword: boolean = false;
  showInputConfirmNewPassword: boolean = false;

  subscriptions: Subscription[] = [];

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  countdown: number = 120;
  intervalId: any;
  private appService = inject(AppService)

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    
  }

  onClickButtonSkip(): void {
    this.clickButtonSkip.emit(false);
  }

  onClickButtonSubmit(): void {
    this.loadingFullscreen.emit(true);

    // when submit username
    if (this.showInputUsername == true) {
      this.subscriptions.push(
        this.appService
        .post("/api/SysUser/SubmitUsernameWhenForgotPassword", this.accountModel)
        .subscribe(res => {
          this.loadingFullscreen.emit(false);

          this.checkUsername = res.body.innerBody;
  
          if (this.checkUsername == true) {
            // disable button submit
            this.btnSubmit.nativeElement.style.pointerEvents = "none";
            this.btnSubmit.nativeElement.style.background = "#ccc";

            this.showInputUsername = false;
            
            this.showTitleTimeRemaining = true;
            this.showTitleEnterVerificationCode = true;
            this.showInputVerificationCode = true;
  
            this.miniDialog.nativeElement.style.height = "335px";

            this.startCountdown();
          }
          else {
            // nếu sai tài khoản thì không làm gì cả
          }
        })
      );
    }

    // when submit verification code
    if (this.showInputVerificationCode == true) {
      this.subscriptions.push(
        this.appService
        .post("/api/SysUser/SubmitVerificationCode", this.accountModel)
        .subscribe(res => {
          this.loadingFullscreen.emit(false);

          this.checkCode = res.body.innerBody;

          if (this.checkCode == true) {
            // disable button submit
            this.btnSubmit.nativeElement.style.pointerEvents = "none";
            this.btnSubmit.nativeElement.style.background = "#ccc";

            this.showInputVerificationCode == false;

            this.showTitleTimeRemaining = false;
            this.showTitleEnterVerificationCode = false;
            this.showInputVerificationCode = false;

            this.showInputNewPassword = true;
            this.showInputConfirmNewPassword = true;

            this.miniDialog.nativeElement.style.height = "390px";
          }
          else {
            // nếu sai code thì không làm gì cả
          }
        })
      );
    }

    // when submit new password
    if (this.showInputNewPassword == true) {
      this.subscriptions.push(
        this.appService
        .post("/api/SysUser/ChangePasswordWhenForgotPassword", this.accountModel)
        .subscribe(res => {
          this.loadingFullscreen.emit(false);

          this.checkNewPassword = res.body.innerBody;

          if (this.checkNewPassword == true) {
            this.clickButtonSkip.emit(false);
          }
          else {
            // ...
          }
        })
      );
    }
  }

  onInputUsernameByUser(): void {
    console.log("Show value input:\n", this.accountModel.username);

    if (this.accountModel.username != "") {
      // enable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "auto";
      this.btnSubmit.nativeElement.style.background = "#f37540";
    }
    else {
      // disable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "none";
      this.btnSubmit.nativeElement.style.background = "#ccc";
    }
  }

  onInputVerificationCodeByUser(): void {
    console.log("Show value input:\n", this.accountModel.verificationCode);

    if (this.accountModel.verificationCode != "") {
      // enable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "auto";
      this.btnSubmit.nativeElement.style.background = "#f37540";
    }
    else {
      // disable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "none";
      this.btnSubmit.nativeElement.style.background = "#ccc";
    }
  }

  onInputNewPasswordByUser(): void {
    console.log("Show value input:\n", this.accountModel.newPassword);

    if (this.accountModel.newPassword != "" && this.accountModel.confirmNewPassword) {
      // enable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "auto";
      this.btnSubmit.nativeElement.style.background = "#f37540";
    }
    else {
      // disable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "none";
      this.btnSubmit.nativeElement.style.background = "#ccc";
    }
  }

  onInputConfirmNewPasswordByUser(): void {
    console.log("Show value input:\n", this.accountModel.confirmNewPassword);

    if (this.accountModel.newPassword != "" && this.accountModel.confirmNewPassword) {
      // enable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "auto";
      this.btnSubmit.nativeElement.style.background = "#f37540";
    }
    else {
      // disable button submit
      this.btnSubmit.nativeElement.style.pointerEvents = "none";
      this.btnSubmit.nativeElement.style.background = "#ccc";
    }
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        // Đặt hành động khi đếm ngược kết thúc, ví dụ: dừng đếm ngược hoặc thực hiện một hành động khác
        clearInterval(this.intervalId);
        // Đặt hành động khác tại đây (nếu cần)

        // Đếm đến 0 thì gọi hàm onCountdownEnd()
        this.onCountdownEnd();
      }
    }, 1000); // Mỗi giây đếm một lần
  }

  onCountdownEnd() {
    // Thực hiện hành động khi countdown đạt đến 0, ví dụ: log ra console
    console.log("countdown đạt đến 0!");
    
    if (this.checkCode == false) {
      this.showInputVerificationCode = false;
      this.showTitleEnterVerificationCode = false;

      this.miniDialog.nativeElement.style.height = "280px";
    }
  }

}