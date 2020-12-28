import React from 'react'
import { Container, Divider, Grid, Header, List, Segment, Image } from 'semantic-ui-react'

import LOGO from './logo.png'

export default function Footer(props) {


    return (
        <>
            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
                <Container textAlign='center'>


                    <Divider inverted section />
                    <Image centered size='mini' src={LOGO} />
                    <List horizontal inverted divided link size='small'>
                        <List.Item as='a' href='#'>
                            Site Map
          </List.Item>
                        <List.Item as='a' href='#'>
                            Contact Us
          </List.Item>
                        <List.Item as='a' href='#'>
                            Terms and Conditions
          </List.Item>
                        <List.Item as='a' href='#'>
                            Privacy Policy
          </List.Item>
                    </List>
                </Container>
            </Segment>
        </>
    )
}
