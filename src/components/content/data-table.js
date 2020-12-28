import React from 'react'
import { Table, Image, Icon, Menu } from 'semantic-ui-react'
import { db_influencers } from '../../firebase'
import _ from 'lodash';

import './style.css'

export default function DataTable({ data, isLoading, influencers }) {



    const renderData = () => {

        let list = []
        if (data && data) {
          //  console.log(data, 'data')
            list = _.map(data, (item, index) => {
                return (
                    <Table.Row>
                        <Table.Cell>

                            <div>
                                <Image className='user__pic' src={item.influencer && item.influencer.banner && item.influencer.banner} />

                                <p>{item.influencer && item.influencer.name && item.influencer.name}</p>
                                <p>{item.influencer && item.influencer.email && item.influencer.email}</p>
                            </div>

                        </Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.commission}</Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                    </Table.Row>
                )

            })


        }

        return list
    }
    return (
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Influencers</Table.HeaderCell>
                        <Table.HeaderCell>Sales Number</Table.HeaderCell>
                        <Table.HeaderCell>Commissons amount</Table.HeaderCell>
                        <Table.HeaderCell>Products number</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>


                    {renderData()}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        </>
    )
}
