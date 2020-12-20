import React, { useState, useRef, RefObject } from 'react'
import { Edit } from './Icons'
import { KeyboardEvent } from 'react'
import '../styles/Editable.scss'

export interface EditableProps {
	initialValue: any
	onChange(newValue: String): void
}

const Editable = ({ initialValue, onChange }: EditableProps) => {
	const [previosValue, setPreviosValue] = useState(initialValue)
	const editableInput: RefObject<HTMLElement> = useRef(null)

	const enableEditing = () => {
		let input = editableInput.current
		if (input) {
			input.setAttribute('contenteditable', '')
			input.focus()
			setPreviosValue(input.innerText)
			setContent(input.innerText)

			// Select the element
			const selection = window.getSelection()
			selection?.removeAllRanges()
			const range = document.createRange()
			range.selectNodeContents(input)
			selection?.addRange(range)
		}
	}

	const disableEditing = () => {
		let input = editableInput.current
		if (input) {
			input.removeAttribute('contenteditable')
		}
	}

	const setContent = (value: string) => {
		if (editableInput.current) {
			editableInput.current.innerText = value
		}
	}

	const handleBlur = () => {
		disableEditing()
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
			setContent(previosValue)
		}

		if (e.key === 'Enter') {
			if (editableInput.current) {
				setPreviosValue(editableInput.current.innerText)
				setContent(editableInput.current.innerText)
				onChange(editableInput.current.innerText)
				disableEditing()
			}
		}
	}

	return (
		<div className="Editable">
			<span
				ref={editableInput}
				className="Editable-content"
				onBlur={handleBlur}
				onDoubleClick={enableEditing}
				onKeyDown={handleKeyDown}
			>
				{initialValue}
			</span>
			<button className="Editable-button" onClick={enableEditing}>
				<Edit />
			</button>
		</div>
	)
}

export default Editable
