

cube([72,22,4]);



translate([1,10,4])
{  
    linear_extrude(height = 2.5)
    {
        color(c = [1,0,0], alpha = 1.0){
        text(text="#Sodalicious", spacing=0.9, font="Arial");
        }  
    }
}
translate([1,2,4]) {
    linear_extrude(height = 2.5)
    {
        color(c = [1,0,0], alpha = 1.0){
        text(text="British Mixing Technology", spacing=0.9, font="Arial", size=5);
        }  
    }
}
