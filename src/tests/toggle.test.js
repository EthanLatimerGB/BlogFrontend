import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'

describe('Toggle component', () => {
    let component

    beforeEach(() => {
        component = render(
            <Blog key={blog.id} blog={blog}/>
        )
    })

    test('Children are not displayed', () => {
        const div = component.container.querySelector('.toggleableComponent')
        expect(div).toHaveStyle('display: block')
    })

    test('Children are displayed when the button is clicked', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)
        const div = component.container.querySelector('.toggledComponent')
    })
})

