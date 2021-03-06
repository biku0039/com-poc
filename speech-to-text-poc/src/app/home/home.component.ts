import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { SpeechRecognitionService } from '../services/speech-recognise.service';
import {  HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showSearchButton: boolean;
  speechData: string;
  stream: FormGroup;
  form: FormGroup;
  flag: boolean;
  flag1: boolean;
  flag2: boolean;
  title = 'Upload a File';
  chooseFile = 'Choose a File';
  errorMessage: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  // tslint:disable-next-line:no-inferrable-types
  loading: boolean = false;
  uploadedFiles: any;
  url: any;
  textFile: any;
  constructor(private fb: FormBuilder,
              private uploadService: UploadService,
              private speechRecognitionService: SpeechRecognitionService,
              private http: HttpClient

) {
    this.createForm();
  }

  ngOnInit(): void {
    this.stream = this.fb.group({
      speech: this.speechData
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.speechRecognitionService.DestroySpeechObject();
  }


  // Uploading File
  fileChange(element) {
    if (element.target.files[0].type === 'audio/mpeg') {
      if (element.target.files && element.target.files[0]) {
        this.chooseFile = element.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(element.target.files[0]); // read file as data url
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        };
        this.uploadedFiles = element.target.files;
      }
    }
    else {
      alert('Enter only mp3 file');
    }
  }

  upload() {
    const formData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('uploads[]', this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.uploadService.uploadFile(formData)
      .subscribe( response => {
        console.log(response);
        this.textFile = response;
      });
  }


  createForm() {
    this.form = this.fb.group({
      fileInput: null
    });
  }

  show(){
   this.flag = true;
  }
  audioFile(){
    this.flag1 = true;
  }
  streamFile(){
   this.flag2 = true;
  }


  activateSpeechSearchMovie(): void {
    // alert("hi");
    this.showSearchButton = false;

    this.speechRecognitionService.record()
      .subscribe(
        // listener
        (value) => {
          this.speechData = value;
          // alert(value);
          console.log(this.speechData);
        },
        // errror
        (err) => {
          console.log(err);
          if (err.error === 'no-speech') {
            console.log('--restatring service--');
            this.activateSpeechSearchMovie();
          }
        },
        // completion
        () => {
          this.showSearchButton = true;
          console.log('--complete--');
          this.activateSpeechSearchMovie();
        });
  }

  onSubmit() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  }


