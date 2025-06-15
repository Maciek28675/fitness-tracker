import { Colors } from '@/constants/Colors';
import * as React from 'react';
import { useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';


interface props {
    headerText: string,
    isVisible: boolean,
    children?: React.ReactNode,
}

const MessageModalChildren: React.FC<props> = ({headerText, isVisible, children}) => {

    const scaleUnderstood = useRef(new Animated.Value(1)).current;
  
    return (
        <Modal animationType='fade' transparent visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeaderContainer}>
                        <Text style={styles.modalTitle}>{headerText}</Text>
                    </View>
                    <View style={styles.modalMainContainer}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  modalContainer: {
        backgroundColor: '#00000080',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
  },
  modalContent: {
    borderRadius: 18,
    borderCurve: 'continuous',
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginHorizontal: 16 
  },
  modalHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
    gap: 8,
    flexDirection: 'row',
    marginHorizontal: 16
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  modalMainContainer: {
    //alignItems: 'center',
    //justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  modalMainText: {
    fontSize: 13,
    textAlign: 'justify'
  },
  modalFooterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  modalFooterButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: Colors.light.mainTheme,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  modalFooterButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.mainTheme
  }
})

export default MessageModalChildren;