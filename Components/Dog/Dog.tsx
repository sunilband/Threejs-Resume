import React from 'react'

type Props = {}

const Dog = (props: Props) => {
  return (
    <div className="dog">
  <div className="heart heart--1" />
  <div className="heart heart--2" />
  <div className="heart heart--3" />
  <div className="heart heart--4" />
  <div className="head">
    <div className="ear ear--left" />
    <div className="ear ear--right" />
    <div className="nose" />
    <div className="face">
      <div className="eye eye--left" />
      <div className="eye eye--right" />
      <div className="mouth" />
    </div>
  </div>
  <div className="body">
    <div className="cheast" />
    <div className="back" />
    <div className="legs">
      <div className="legs__front legs__front--left" />
      <div className="legs__front legs__front--right" />
      <div className="legs__back legs__back--left" />
      <div className="legs__back legs__back--right" />
    </div>
    <div className="tail" />
  </div>
</div>


  )
}

export default Dog