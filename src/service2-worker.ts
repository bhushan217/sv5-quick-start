/// <reference types="@sveltejs/kit" />
// / <reference types="webworker" />

import {build, files, version} from '$service-worker'

if('serviceworker' in navigator){
}
console.log({build, files, version})