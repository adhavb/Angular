import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: FormGroup;
  constructor(private formBuilder: FormBuilder){}
  ngOnInit() {
    this.user = this.formBuilder.group(
      {
        name:['Bhuvan',[Validators.required, Validators.minLength(2)]],
        account:this.formBuilder.group({
          email:['',[Validators.required,
            Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')]],
          confirm:['',Validators.required]
        })
      }
    );
    /*this.user = new FormGroup({
      name: new FormControl('Bhuvan', [Validators.required, Validators.minLength(2)]),
      account: new FormGroup({
        email: new FormControl('', Validators.required),
        confirm: new FormControl('', Validators.required)
      })
    });*/
  }

  
  
  onSubmit() {
    console.log(this.user.value, this.user.valid);
  }
}
