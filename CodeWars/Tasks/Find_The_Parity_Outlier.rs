

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