import { TextEncoder, TextDecoder } from "util"
import "whatwg-fetch"

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.fetch = fetch
