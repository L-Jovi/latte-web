use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let a = 2;
        let b = 3;
        let result = a + b;
        assert_eq!(result, add(a, b));
    }
}
