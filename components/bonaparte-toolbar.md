# < bonaparte-toolbar >
The toolbar component is a specialized [bonaparte sidebar](bonaparte-sidebar.html) which contains button groups. 

The toolbar inherits all the functionality from [`<bonaparte-sidebar>`](bonaparte-sidebar.html). In addition child elements of the _sidebar_ are handled as _ button groups_ and spread evenly from left to right / top to bottom.

## Structure
```html
<bonaparte-toolbar
  position
  open
>
    <1st-child> <!-- sidebar -->
        <nth-child> <!-- group -->
    </1st-child>
    
    <2nd-child> <!-- content -->

</bonaparte-toolbar>
```

#### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | sidebar | yes | Will be place according to the _sidebar_ attribute.
__1.x__ | button-group | (yes) | All direct children of the _sidebar_ are handled as button groups and spread evenly within the sidebar.
__2__ | content | yes | Holds the main content. The sidebar is placed around this element.