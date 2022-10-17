import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  scannedResult: any;
  content_visibility = 'hidden';

  constructor(private menu: MenuController) {
    this.menu.enable(true);
    this.content_visibility = '';
    }
    async  checkPermission() {
    try{
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return true;
    } catch(e) {
      console.log(e);
    }
  }
  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  ngOnInit() {
  }

}
