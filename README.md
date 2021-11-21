# Tailwind Table Responsive

adapts a table to a responsive format that can be viewed on small screens (mobile)  
Initially it works with Tailwind CSS but can be adapted to any other framework


## How it works

- it scans the page for tables according to a given selector (default table.adaptToMobile)
- Add a <span> tag in each td cell with the name of the related <th> header
- Adds a class so you can use a media query to display a better looking table on smaller screens
- by default it's configured to work with tailwind css, but it can be easily adapted to any other library


## Usage

Download the library and instert it into your page 

(optional) If not using tailwind css configure the class to show/hide the added element

Enable it after the page is loaded



