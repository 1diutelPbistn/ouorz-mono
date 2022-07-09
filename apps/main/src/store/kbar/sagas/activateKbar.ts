import { put } from 'redux-saga/effects'
import {
	activateKbar,
	addToKbarLists,
	setKbarAnimation,
	setKbarLocation,
	showKbar,
	setKbarLoading,
	setKbarList,
} from '../actions'

export default function* activateKbarSaga(
	action: ReturnType<typeof activateKbar>
) {
	try {
		if (action.payload.homeList) {
			// put kbar in loading state before showing it
			yield put(setKbarLoading(true))

			// add home list to cache
			yield put(addToKbarLists('home', action.payload.homeList))
			// set current display list
			yield put(setKbarList(action.payload.homeList))
			// set kbar location in the store
			yield put(setKbarLocation(['home']))

			// set animation
			yield put(setKbarAnimation('in'))
			// show the reader
			yield put(showKbar())

			// stop loading
			yield put(setKbarLoading(false))
		} else {
			throw new Error('No list data provided')
		}
	} catch (error) {
		console.error(error)
	}
}
