import React from 'react'
import { Link } from 'react-router-dom'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'

import LOGO from './logotest.png'

const HeaderTest = ({ logout }) => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image src={LOGO} style={{ marginRight: '1.5em' }} />
          Test Technique
        </Menu.Item>
                <Menu.Item position='left'><Link to='/test/home'>Accueil</Link></Menu.Item>
                <Menu.Item as='' onClick={logout}>Déconnexion</Menu.Item>
            </Container>
        </Menu>




    </div>
)

export default HeaderTest
