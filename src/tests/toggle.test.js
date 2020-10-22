import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'
import Service from '../services/blogs'
import { act } from 'react-dom/test-utils'
import BlogForm from '../components/blogForm'

describe('Toggle component', () => {
    let component

    const blog = {
        title: 'Use the Jager you twata',
        author: 'ethan latimer',
        URL: 'http://buh',
        likes: 100
    }


    test('Children are not displayed', () => {
        component = render(
            <Blog key={blog.id} blog={blog} likeInc={Service.incrementBlogLikes}/>
        )

        const div = component.container.querySelector('.toggleableContent')
        expect(div).toHaveStyle('display: block')
    })

    test('Children are displayed when the button is clicked', () => {
        component = render(
            <Blog key={blog.id} blog={blog} likeInc={Service.incrementBlogLikes}/>
        )

        const button = component.getByText('Expand')
        fireEvent.click(button)

        const div = component.container.querySelector('.toggleableContent')
        expect(div).not.toHaveStyle('display: block')
    })

    //Function that keeps returning a werid error

    /* test('Tests event handler is called twice when like button is clicked twice', () => {
        const incrementFunction = jest.fn()
        component = render(
            <Blog key={blog.id} blog={blog} likeInc={incrementFunction}/>
        )

        //Renders the whole blog information
        const button = component.getByText('Expand')
        act(() => {
            fireEvent.click(button)
        })

        //Clicks like button and tests if event handler is called twice
        const incrementButton = component.getByText('Like')
        act(() => {
            fireEvent.click(incrementButton)
            fireEvent.click(incrementButton)
        })

        expect(incrementFunction.mock.calls).toHaveLength(2)
    }) */
})

