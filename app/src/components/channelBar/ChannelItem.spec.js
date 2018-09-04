import {shallow} from "enzyme";
import {ChannelItem} from "./ChannelItem";
import React from 'react'


const setup = (channel, lastMessage) => {
    const actions = {
        switchChannel: jest.fn(),
    };

    const component = shallow(<ChannelItem channel={channel} lastMessage={lastMessage} {...actions}/>);

    return {
        component: component,
        actions: actions,
        button: component.find('button'),
        h3: component.find('button > h3')
    }
};

const channel = {
    created: "2018-11-12",
    title: "test-title",
};

const lastMessage = {
    body: "test-body"
};

describe('Channel Item', () => {
    it('should display last message', () => {
        const { h3 } = setup(channel, lastMessage);
        expect(h3.text()).toMatch(/^test-body/);
    })
});