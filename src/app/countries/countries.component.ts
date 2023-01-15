import { Component, OnInit } from '@angular/core';
import { CountryService } from '../service/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  text='';
  countries = [];
  paginationCountries = [];
  myCountry:any;
  load = false;
  show = true;
  spinner = false;
  statusText = "";

  languages = ""
  currencies = ""

  constructor(private sc:CountryService) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  mySortingFunction = (a:any, b:any) => {
    return a.key > b.key ? -1 : 1;
  }

  getAllCountries(){
    this.spinner = true;
   this.sc.getCountries().subscribe((res:any)=>{
     if(res){
      this.spinner = false;
      this.countries = res;
      this.paginationCountries.push(...this.countries.slice(0,20));
      this.sorting();
     }else{
      this.spinner = false;
     }
   })
  }

  showMore(){
    this.load = true;
    if(this.countries){
      this.paginationCountries.push(...this.countries.slice(this.paginationCountries.length,this.paginationCountries.length+20));
        this.sorting();
        this.load = false;
    }
  }
  sorting(){
    this.paginationCountries.sort(function (a, b) {
      if (a['name']['common'] < b['name']['common']) {
        return -1;
      }
      if (a['name']['common'] > b['name']['common']) {
        return 1;
      }
      return 0;
    });
  }

  searchMyCountry(){
    this.statusText = '';
    this.show = false;
    this.spinner = true;
    this.paginationCountries = [];
    if(this.text != ''){
      this.sc.searchCountry(this.text).subscribe((res:any)=>{
        if(res){
          this.spinner = false
          this.paginationCountries = res;
          this.sorting();
        }
      },err=>{
        this.spinner = false
        this.statusText = "Data Not Found"
      })
    }
  }

  viewAllData(){
    this.text = '';
    this.statusText = '';
    this.show = true;
    this.paginationCountries=[];
    this.getAllCountries();
  }

  countryInfo(country:any){
    this.languages = ""
    this.currencies = ""
    this.myCountry = country;
    for (const key in this.myCountry?.languages) {
      this.languages += this.myCountry?.languages[key]+', ';
    }
    this.languages = this.languages.slice(0,-2);
    for (const key in this.myCountry?.currencies) {
     this.currencies += this.myCountry?.currencies[key].name+', ';
    }
   this.currencies = this.currencies.slice(0,-2);
  }

}
