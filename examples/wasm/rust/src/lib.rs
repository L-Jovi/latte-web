// JavaScript and Wasm exchange i32 values directly; no strings or heap objects cross this ABI.
#[unsafe(no_mangle)]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a.wrapping_add(b)
}
#[cfg(test)]
mod tests {
    use super::add;
    #[test]
    fn adds_signed_integers() { assert_eq!(add(2, 3), 5); assert_eq!(add(-8, 3), -5); assert_eq!(add(0, 0), 0); }
    #[test]
    fn overflow_is_explicit() { assert_eq!(add(i32::MAX, 1), i32::MIN); }
}
