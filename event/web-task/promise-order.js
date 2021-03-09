Promise.resolve(() => {
  console.log('Promise.resolve: ', 1)

  Promise.resolve(() => {
    console.log('Promise.resolve: ', 3)

    Promise.resolve(() => {
      console.log('Promise.resolve: ', 5)
    })
      .then(() => {
        console.log('Promise.resolve: ', 6)
      })
  })
    .then(() => {
      console.log('Promise.resolve: ', 4)
    })
})
  .then(() => {
    console.log('Promise.resolve: ', 2)
  })
