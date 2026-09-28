// A serialization probe, not a general cycle detector (BigInt and throwing toJSON also fail).
function isCycleByJSON(obj) {
  try { JSON.stringify(obj); return false }
  catch { return true }
}
