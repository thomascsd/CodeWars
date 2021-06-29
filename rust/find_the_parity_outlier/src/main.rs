/*
You are given an array (which will have a length of at least 3,
but could be very large) containing integers.
The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N.
 Write a method that takes the array as an argument and returns this "outlier" N.
Examples

[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
*/


fn main() {
    let list = [2, 4, 0, 100, 4, 11, 2602, 36];
    let num  = find_outlier(&list);
    println!("{}", num);
}
fn find_outlier(values: &[i32]) -> i32 {
    let mut odds: Vec<i32> = Vec::new();
    let mut evens: Vec<i32> = Vec::new();
    
    for n in values.iter() {
        if n % 2 == 0 {
          evens.push(*n);
        }
        else {
          odds.push(*n);
        }
    }
    
    if odds.len() == 1 {
        odds[0]
    }
    else {
        evens[0]
    }

}